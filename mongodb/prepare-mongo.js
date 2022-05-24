db = db.getSiblingDB('geosensorweb')

validator = {
  validator: {
    "$jsonSchema": {
      bsonType: "object",
      properties: {
        name: {
          bsonType: "string",
          description: "Device name, required."
        },
        dev_eui: {
          bsonType: "string",
          description: "Upper case DEV_EUI, required."
        },
        group_id: {
          bsonType: "int",
          minimum: 0,
          maximum: 1000,
        },
        mappings: {
          bsonType: "array",
          minItems: 1,
          uniqueItems: true,
          items: {
            bsonType: "object",
            properties: {
              lpp_id: {
                bsonType: "int",
                minimum: 0,
                maximum: 9999,
              },
              sta_servers: {
                bsonType: "array",
                minItems: 1,
                uniqueItems: true,
                items: {
                  bsonType: "object",
                  properties: {
                    sta_url: {
                      bsonType: "string"
                    },
                    iot_id: {
                      bsonType: "int"
                    }
                  },
                  required: [
                    "sta_url",
                    "iot_id"
                  ]
                }
              }
            },
            required: [
              "lpp_id",
              "sta_servers"
            ]
          },
        }
      },
      required: [
        "name",
        "dev_eui",
        "mappings"
      ]
    }
  },
  validationAction: "error"
}

db.createCollection('student', validator)
db.student.createIndex({ dev_eui: 1 }, { unique: true })

db.createCollection('admin', validator)
db.admin.createIndex({ dev_eui: 1 }, { unique: true })

db.createRole({
  role: "student-role",
  privileges: [{
    resource: {
      db: 'geosensorweb',
      collection: 'student'
    },
    actions: ["find", "insert", "remove", "update"]
  }],
  roles: []
})

db.createUser({
  user: 'student',
  pwd: 'changeMe',
  roles: [
    { role: 'student-role', db: 'geosensorweb' },
    { role: 'read', db: 'geosensorweb' }
  ]
})

db = db.getSiblingDB('admin')

db.createUser({
  user: 'admin',
  pwd: 'changeMe',
  roles: [
    { role: 'readWriteAnyDatabase', db: 'admin' }
  ]
})