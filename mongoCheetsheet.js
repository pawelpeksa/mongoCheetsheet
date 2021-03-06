//Mongo cheet sheet:


//schema:
{
	"_id" : BinData(0,"4a6510jZTJGcOjS5zC7etg=="),
	"roles" : {
		"default_user_roles" : [],
		"all_of" : [],
		"one_of" : []
	},
}


// filter array is not empty:

{ "roles.one_of": { $exists: true, $not: {$size: 0}} }



// filter array exists and is not null:

{ "roles.one_of": { $exists: true, $ne: null } }



// Update element in array:

db.myCollection.updateMany(
   { "roles.one_of": "romek" },
   { "$set": { "roles.one_of.$": "Tomek" } }
)

db.myCollection.updateMany(
   { "roles.default_user_roles": "romek" },
   { "$set": { "roles.default_user_roles.$": "Tomek" } }
)



//add element to array

db.myCollection.updateMany(
{},
{ $addToSet: { 'roles.one_of': "Tomek" } }
)

// find when size equal
db.myCollection.find(
  {"roles.all_of": { $exists: true, $size: 2} }
);




// update when array has one particular element

// all_of set to empty array if there's one element and this element is "romek"
db.myCollection.updateMany(
  {"roles.all_of": { $exists: true, $size: 1, $in: ["romek"]}},
  {$set: {"roles.all_of": []}}
);


// default_user_roles, replace romek with Tomek 
db.myCollection.updateMany(
   { "roles.default_user_roles": "romek" },
   { "$set": { "roles.default_user_roles.$": "Tomek" } }
)

// one of, if romek exists add Tomek
db.myCollection.updateMany(
  {"roles.one_of": { $exists: true, $in: ["romek"]}},
  { $addToSet: { 'roles.one_of':  "Tomek"  } }
);


// query by time 

db.SessionData.find({

created_at: {
        $gt: ISODate("2010-04-29T00:00:00.000Z"),
        $lt: ISODate("2020-05-01T00:00:00.000Z")
    }


})
   .projection({})
   .sort({_id:-1})
   .limit(100)



// sort by number of elements in array:

   db.catalogs.aggregate([
    {
        $project : { products_count: {$size: { "$ifNull": [ "$product_ids", [] ] } } }
    }, 
    {   
        $sort: {"products_count":-1} 
        
    }
    ])



// count user with consents
db.UserData.find(
    {
       "$or":[
          {
             "data.dataForRecommendationAndFootwear":{
                "$exists":true,
                "$ne":null
             }
          },
          {
             "data.dataForResearchAmdImprovements":{
                "$exists":true,
                "$ne":null
             }
          }
       ]
    }
)
.projection({})
.sort({_id:-1})
.count()

// remove element from array
db.products.update(
  { _id: id },
  { $pull: { 'body.attributes': { key: 'size_range_steps' } } }
);

