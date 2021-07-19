const { UserInputError, SyntaxError, ForbiddenError, 
    ValidationError, AuthenticationError, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const GameModel = require('../models/Game')

const emailValidator = require('email-validator')
const sendEmail = require('../utils/sendEmail')

const pubsub = new PubSub()

const Mutation = {
    restoreAccount: async( root, args, context) => {
        const user = await UserModel.find( { email: args.email })
        return "TODO";
    },
    changeSettings: async( root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')
        const user = await UserModel.findById(context.loggedUser.id)
        if (!emailValidator.validate(args.email) && args.name === '' && args.password === '') {
            throw new UserInputError('Ei tarpeeksi parametrejä!')
        }

        if ( args.email && args.email != '' && emailValidator.validate(args.email)) {
            user.email = args.email;
        }
        if (args.name && args.name != '') {
            user.name = args.name;
        }
        if (args.password && args.password != '') {
            user.passwordHash = await bcrypt.hash( args.password, 10)
        }
        try {
          await user.save();
        } catch(e) {
            throw new UserInputError(e.message)
        }
        // Palauta uusi, päivitetty käyttäjä
        return user;
    },
    deleteGame: async( root, args, context) => {
        if (!context.loggedUser) throw new AuthenticationError('Kirjaudu sisään')

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
    setScore: async (root, args) => {

        const peli = await GameModel.findById(args.roundId).populate('players.user')

        if (!peli) throw new SyntaxError('Epäkelpo ID')
        if (peli.finished) throw new ForbiddenError('Päättynyttä peliä ei voi enää muokata')

        const pelaaja = peli.players.find(p => p.user.user === args.player)
        if (!pelaaja) throw new SyntaxError('Pelaajaa ei löydy')

        pelaaja.tulokset.set(args.round, args.score)

        await peli.save()

        pubsub.publish( "SCORE_SET", { changedCard: { data: pelaaja, roundId: peli.id }})

        return peli

    },
    login: async (root, args) => {
        const user = await UserModel.findOne({ user: args.user })

        if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
            throw new UserInputError("Väärä tunnus tai salasana")
        }
        else {
            const forToken = {
                user: user.user,
                id: user.id
            }
            const token = jwt.sign(forToken, process.env.TOKEN_KEY)
            return { value: token, user: { user: user.user, name: user.name } }
        }
    },
    createUser: async (root, args) => {
        const newUser = new UserModel({
            user: args.user,
            name: args.name,
            email: args.email,
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
            const maili = sendEmail(newUser.email, 'Tervetuloa Rageputtiin',`
            Hei ${newUser.name},

            Tervetuloa käyttämään Rageputtia! Toivottavasti frisbeejumalat ovat puolellasi
            ja puttailu on kuin linnunmaitoa joisi!

            Terveisin,
            Rage Putt
            http://rageputt.herokuapp.com
            rageputt@gmail.com
            `)
            console.log(maili)
        }
        return newUser;
    },
    sendFriendRequest: async (root, args, context) => {
        if (!context.loggedUser?.user) {
            throw new AuthenticationError('Kirjaudu sisään!')
        }
        const myId = context.loggedUser.id

        const kaveri = await UserModel.findOne({ user: args.fName })

        if (!kaveri) {
            throw new UserInputError(`Henkilöä ${args.fName} ei löydy`)
        }
        if (kaveri.friends.includes(myId)) {
            throw new UserInputError('Olette jo kavereita')
        }
        if (kaveri.id == myId) {
            throw new UserInputError("Oikeesti?")
        }
        if (kaveri.friendRequests.includes(myId)) {
            throw new UserInputError('Kaveripyyntö on jo lisätty')
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
        const user = await UserModel.findById(myId)

        if (!user.friendRequests.includes(friendId)) {
            throw new UserInputError('Kaveri ei ole lähettänyt pynntöä!?')
        }

        user.friendRequests = user.friendRequests.filter(u => u != friendId)
        if (args.action) {
            const frendi = await UserModel.findById(friendId)
            if (!frendi) {
                throw new UserInputError('Kaveria ei ole olemassa')
            }
            if (!user.friends.includes(friendId))
                user.friends.push(friendId)
            if (!frendi.friends.includes(myId))
                frendi.friends.push(myId)
            try {
                await frendi.save()
            } catch (e) {
                throw new SyntaxError('Jokin meni vikaan: ' + e.message)
            }
        }
        await user.save()
        return "OK"
    }
}
module.exports = Mutation;