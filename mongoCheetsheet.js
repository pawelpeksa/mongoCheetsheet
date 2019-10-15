//Mongo cheet sheet:


// filter array is not empty:

{ "roles.one_of": { $exists: true, $not: {$size: 0}} }



// filter array exists and is not null:

{ "roles.one_of": { $exists: true, $ne: null } }



// Update element in array:

db.clients_oauth.updateMany(
   { "roles.one_of": "customer" },
   { "$set": { "roles.one_of.$": "basic" } }
)

db.clients_oauth.updateMany(
   { "roles.default_user_roles": "customer" },
   { "$set": { "roles.default_user_roles.$": "basic" } }
)



//add element to array

db.clients_oauth.updateMany(
{},
{ $addToSet: { 'roles.one_of': "basic" } }
)
