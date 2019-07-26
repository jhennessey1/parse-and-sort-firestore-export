var fs = require('fs');

/*
to use from command line type the following command after using the firebase-export tool
node -e 'require("./parseAndSave").go({FIREBASE_EXPORTED_FILENAME}})'
*/

function parseAndSaveEntities(fileName) {
	var directoriesCreated = 0;
	var filesCreated = 0;
	fs.readFile(fileName, 'utf-8', function(err, data) {
		var collections = JSON.parse(data)['__collections__'];
		var collectionNames = Object.keys(collections);
		collectionNames.forEach(function(collectionName) {
			var fileName = __dirname + '/' + collectionName
			fs.mkdir(fileName, function(err) {
				if (err) {
					console.error(err);
					return;
				}
				var entities = collections[collectionName];
				var entityIds = Object.keys(entities);

				entityIds.forEach(function(entityId) {
					fs.writeFile(fileName + '/' + entityId + '.json', JSON.stringify(entities[entityId]), function(err) {
						if (err) {
							console.error(err);
							return;
						}
					})
				})
			});
		})
	})
}

module.exports.go = parseAndSaveEntities;
