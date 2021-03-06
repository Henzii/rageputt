const { UserInputError, SyntaxError, ForbiddenError,
    ValidationError, AuthenticationError, PubSub, withFilter } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const GameModel = require('../models/Game')

const emailValidator = require('email-validator')
const sendEmail = require('../utils/sendEmail')

const pubsub = new PubSub()

const Mutation = {
    restoreAccount: async (root, args, context) => {
        if (args.email === '' || !args.email) {
            throw new UserInputError('Anna sähköpostiosoite')
        }
        const user = await UserModel.findOne({ email: args.email })
        if (user !== null) {
            const randomPassword = Math.random().toString(36).slice(-8);
            user.tempPasswordHash = await bcrypt.hash(randomPassword, 10)
            try {
                await user.save()
            } catch (e) {
                console.log('ERROR', e)
            }
            const mailia = sendEmail(user.email, 'Kertakäyttöinen salasana', `
Hei ${user.name},

Kertakäyttöinen salasanasi Rageputtiin on ${randomPassword}

Salasana toimii sisäänkirjautumisessa vain yhden kerran,
joten muista vaihtaa salasanasi!

Terveisin,
Rage Putt
http://rageputt.herokuapp.com
rageputt@gmail.com
`)
        }
        return "Done";
    },
    sendFeedback: async (root, args, context) => {
        sendEmail('henry.karlenius@gmail.com', 'Rageputt palaute', `
Lähettäjä: ${args.name}
Sähköposti: ${args.email}
Arvosana: ${args.rating}
Kirjautunut: ${context.loggedUser?.user} / (${context.loggedUser?.id})

Veisti:
===============================
${args.message}
`)
        return "OK"
    },
    changeSettings: async (root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
        const user = await UserModel.findById(context.loggedUser.id).populate('friends', { user: 1, name: 1, id: 1, email: 1 }).populate('friendRequests', { user: 1, name: 1, id: 1 })
        if (!emailValidator.validate(args.email) && args.name === '' && args.password === '' && args.shareStats === '') {
            throw new UserInputError('Ei tarpeeksi parametrejä!')
        }
        if (args.email && args.email != '' && emailValidator.validate(args.email)) {
            user.email = args.email;
        }
        if (args.name && args.name != '') {
            user.name = args.name;
        }
        if (args.password && args.password != '') {
            user.passwordHash = await bcrypt.hash(args.password, 10)
        }
        if (args.shareStats !== null) {
            user.shareStats = args.shareStats
        }
        if (args.ignoreFriendRequests !== null) {
            user.ignoreFriendRequests = args.ignoreFriendRequests
        }
        try {
            await user.save();
        } catch (e) {
            throw new UserInputError(e.message)
        }
        // Palauta uusi, päivitetty käyttäjä
        return user;
    },
    deleteAccount: async (root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
        const id = context.loggedUser.id
        try {
            await UserModel.findByIdAndDelete(id)
            await GameModel.updateMany({ $pull: { players: { user: id } } })
        } catch (e) {
            throw new UserInputError('Virhe: ', e.message)
        }
        return "OK";
    },
    deleteFriend: async (root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
        
        const id = context.loggedUser.id

        const friend = await UserModel.findById ( args.userId )
        if (!friend || friend === null) {
            throw new UserInputError('Epäkelpo kaverin ID')
        }
        friend.friends = friend.friends.filter(f => f+'' !== id)
        await friend.save()

        const user = await UserModel.findById( id )
        user.friends = user.friends.filter(f => f+'' !== args.userId)
        return await user.save()
        
    },
    deleteGame: async (root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')

        const game = await GameModel.findById(args.roundId)
        const user = await UserModel.findById(context.loggedUser.id)

        user.games = user.games.filter(g => g.toString() !== args.roundId)
        await user.save()

        if (game.players.length <= 1) {
            await GameModel.findByIdAndDelete(args.roundId)
        } else {
            game.players = game.players.filter(p => p.user.toString() !== context.loggedUser.id)
            await game.save()
        }

        return "Have a nice day"
    },
    createGame: async (root, args, context) => {

        if (!context.loggedUser.user) {
            throw new AuthenticationError('Kirjaudu sisään!')
        }
        const user = await UserModel.findById(context.loggedUser.id)
        const newGame = new GameModel({
            finished: false,
            timestamp: Date(),
            players: [
                {
                    user: user.id,
                    tulokset: []
                }
            ]
        })
        await newGame.save()

        for (let i = 0; i < args.pelaajat.length; i++) {
            const pp = await UserModel.findById(args.pelaajat[i])
            newGame.players.push({ user: pp.id, tulokset: [] })
            pp.games = pp.games.concat(newGame.id)
            pp.save()
        }
        await newGame.save()
        user.games = user.games.concat(newGame.id)
        user.save();
        return newGame.id

    },
    finishGame: async (root, args) => {
        console.log('Päätetään peli ' + args.roundId)
        const peli = await GameModel.findById(args.roundId)
        if (!peli) throw new SyntaxError('Epäkelpo ID')
        peli.finished = true;
        await peli.save()
        return "OK"
    },

    login: async (root, args) => {
        const user = await UserModel.findOne({ user: args.user.toLowerCase() })
        if (user && (await bcrypt.compare(args.password, user.passwordHash) || await bcrypt.compare(args.password, user.tempPasswordHash))) {
            const forToken = {
                user: user.user,
                id: user.id
            }
            const token = jwt.sign(forToken, process.env.TOKEN_KEY)

            if (user.tempPasswordHash) {
                user.tempPasswordHash = undefined;
                await user.save()
            }
            return { value: token, user: { user: user.user, name: user.name } }
        } else {
            throw new UserInputError('Väärä tunnus tai salasana!')
        }

    },
    createUser: async (root, args) => {
        const newUser = new UserModel({
            user: args.user.toLowerCase(),
            name: args.name,
            email: args.email,
            shareStats: true,
            ignoreFriendRequests: false,
            passwordHash: await bcrypt.hash(args.password, 10)
        })

        if (args.name === '') newUser.name = args.user
        if (!emailValidator.validate(newUser.email)) {
            newUser.email = ''
        }

        try {
            await newUser.save();
        } catch (e) {
            console.log(e.errors.type)
            if (e.errors.user.kind === 'unique')
                throw new ValidationError('Käyttäjä on jo olemassa')
            else if (e.errors.user.kind === 'minlength')
                throw new ValidationError(`Käyttäjätunnus on liian lyhyt`)
            else
                throw new ValidationError('Käyttäjätunnusta ei voitu luoda')
        }
        if (newUser.email != '') {
            const maili = sendEmail(newUser.email, 'Tervetuloa Rageputtiin', `
            Hei ${newUser.name},

            Tervetuloa käyttämään Rageputtia! Toivottavasti frisbeejumalat
            ovat puolellasi ja puttailu sujuu kuin linnunmaitoa joisi!

            Terveisin,
            Rage Putt
            http://rageputt.herokuapp.com
            rageputt@gmail.com
            `)
            console.log(maili)
        }
        const forToken = {
            user: newUser.user,
            id: newUser.id
        }
        const token = jwt.sign(forToken, process.env.TOKEN_KEY)
        return { value: token, user: { user: newUser.user, name: newUser.name } };
    },
    sendFriendRequest: async (root, args, context) => {
        if (!context.loggedUser?.user) {
            throw new AuthenticationError('Kirjaudu sisään!')
        }
        const myId = context.loggedUser.id

        const kaveri = await UserModel.findOne({ user: args.fName.toLowerCase() })

        if (!kaveri) {
            throw new UserInputError(`Henkilöä ${args.fName} ei löydy`)
        }
        else if (kaveri.friends.includes(myId)) {
            throw new UserInputError('Olette jo kavereita')
        }
        else if (kaveri.id == myId) {
            throw new UserInputError("Oikeesti?")
        }
        else if (kaveri.friendRequests.includes(myId)) {
            throw new UserInputError('Kaveripyyntö on jo lisätty')
        } else if (kaveri.ignoreFriendRequests === true) {
            throw new ForbiddenError('Henkilö on estänyt kaveripyynnöt')
        }
        kaveri.friendRequests.push(myId)
        kaveri.save()
        return "OK"
    },
    handleFriendRequest: async (root, args, context) => {
        if (!context.loggedUser?.user) {
            throw new AuthenticationError('Kirjaudu sisään!')
        }
        const myId = context.loggedUser.id
        const friendId = args.friendId
        const user = await UserModel.findById(context.loggedUser.id).populate('friends', { user: 1, name: 1, id: 1, email: 1 }).populate('friendRequests', { user: 1, name: 1, id: 1 })
        if (user.friendRequests.find(f => f.id === friendId) === null) {
            throw new UserInputError('Kaveri ei ole lähettänyt pynntöä!?')
        }

        user.friendRequests = user.friendRequests.filter(u => u.id != friendId)
        if (args.action) {
            const frendi = await UserModel.findById(friendId)
            if (!frendi) {
                throw new UserInputError('Kaveria ei ole olemassa')
            }
            if (user.friends.find(f => f.id === friendId)) {
                throw new UserInputError('Olette jo kavereita!?!?')
            }
            console.log('Lisätään kaveri', user)
            user.friends.push(frendi)
            console.log('Lisätty!', user)

            if (!frendi.friends.includes(myId)) {
                frendi.friends.push(myId)
            }
            await frendi.save()
        }
        try {
            const vastaus = await user.save()
            console.log('Palautetaan', vastaus)
            return vastaus
        } catch (e) {
            throw UserInputError('Jotain meni pieleen', e)
        }

    },
    setScore: async (root, args) => {

        const peli = await GameModel.findById(args.roundId).populate('players.user')

        if (!peli) throw new SyntaxError('Epäkelpo ID')
        if (peli.finished) throw new ForbiddenError('Päättynyttä peliä ei voi enää muokata')

        const pelaaja = peli.players.find(p => p.user.user === args.player)
        if (!pelaaja) throw new SyntaxError('Pelaajaa ei löydy')

        pelaaja.tulokset.set(args.round, args.score)

        await peli.save()

        pubsub.publish("SCORE_SET", { changedCard: peli })

        return peli

    },
}
const Subscription = {
    changedCard: {
        subscribe: withFilter(
            () => pubsub.asyncIterator(['SCORE_SET']),
            (payload, variables) => {
                return (variables.roundId === payload.changedCard.id)
            }
        )
    }
}

module.exports = { Mutation, Subscription };