// Initiate dependencies
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const Population = require('../models/population');

// Create PopulationType for RootQuery
const PopulationType = new GraphQLObjectType({
    name: 'Population',
    fields: ( ) => ({
        country: { type: GraphQLString },
        year: { type: GraphQLString },
        area_km: { type: GraphQLString },
        total_population: { type: GraphQLString },
    })
});

// Implement RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        populations: {
            type: new GraphQLList(PopulationType),
            async resolve(parent){
                const data = await Population.find();
                return data;
            }
        },
        populationById: {
            type: PopulationType,
            args: {id:{type: GraphQLString}},
            resolve(parent, args){
                return Population.findById(args.id)
            }
        },
        populationByYear: {
            type: new GraphQLList(PopulationType),
            args: {year:{type: GraphQLString}},
            async resolve(parent,args){
                const data = await Population.find({year:args.year});
                return data;
            }
        },
        populationByCountry: {
            type: new GraphQLList(PopulationType),
            args: {country:{type: GraphQLString}},
            async resolve(parent,args){
                const data = await Population.find({country:args.country});
                return data;
            }
        }
    }
});

// Implement Mutation
const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        addPopulation: {
            type: PopulationType,
            args: {
                country:{type: new GraphQLNonNull(GraphQLString)},
                year:{type: new GraphQLNonNull(GraphQLString)},
                area_km: {type: new GraphQLNonNull(GraphQLString)},
                total_population: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let population=new Population({
                    country: args.country,
                    year: args.year,
                    area_km:args.area_km,
                    total_population:args.total_population
                })
                return population.save();
            }
        }        
    }
});

// Export RootQuery to use in index.js /graphql route
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});