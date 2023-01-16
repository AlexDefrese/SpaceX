const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');
const axios = require ('axios');


// Launch type

const LaunchType = new GraphQLObjectType ({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt },
        name: {type: GraphQLString },
        launch_year: {type: GraphQLString },
        date_local: {type: GraphQLString},
        success: {type: GraphQLBoolean },
        rocket: {type: RocketType }
    })
});

// Rocket Type

const RocketType = new GraphQLObjectType ({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString },
        rocket_name: {type: GraphQLString },
        rocket_type: {type: GraphQLString }
    })
});

// Root Query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields :{
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v5/launches')
                .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v5/launches/${args.flight_number}`)
                .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v5/rockets')
                .then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v5/launches/${args.id}`)
                .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});