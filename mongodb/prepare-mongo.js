db = db.getSiblingDB('geosensorweb')

db.createCollection('student')
db.createCollection('admin')

db.createRole({
  role: "student-role",
  privileges: [{
    resource: {
      role: 'readWrite',
      db: 'geosensorweb',
      collection: 'student'
    },
    actions: ["find", "insert", "remove", "update"]
  }],
  roles: []
})

db.createUser({
  user: 'student',
  pwd: 'geoSensorWeb2022',
  roles: [
    { role: 'student-role', db: 'geosensorweb' },
    { role: 'read', db: 'geosensorweb' }
  ]
})

db.student.createIndex({ name: "idx_dev_eui_asc" }, { dev_eui: 1 }, { unique: true })
db.admin.createIndex({ name: "idx_dev_eui_asc" }, { dev_eui: 1 }, { unique: true })

db.student.insert({
  _id: '8765182202E81AAB',
  name: 'tumgis-testnode-swm-0126_outdoor',
  group_id: 99,
  dev_eui: '8765182202E81EAAB',
  mappings: [{
      lpp_id: 1,
      sta_servers: [{
          sta_url: 'https://gi3.gis.lrg.tum.de/frost/v1.1',
          iot_id: 5
        },
        {
          sta_url: 'https://otherSTA.gis.lrg.tum.de/frost/v1.1',
          iot_id: 5
        }
      ]
    },
    {
      lpp_id: 4,
      sta_servers: [{
        sta_url: 'https://otherSTA.gis.lrg.tum.de/frost/v1.1',
        iot_id: 5
      }]
    }
  ]
})

db.admin.insert({
  _id: '8765182202E81AAB',
  name: 'tumgis-testnode-swm-0126_outdoor',
  group_id: 99,
  dev_eui: '8765182202E81EAAB',
  mappings: [{
      lpp_id: 1,
      sta_servers: [{
          sta_url: 'https://gi3.gis.lrg.tum.de/frost/v1.1',
          iot_id: 5
        },
        {
          sta_url: 'https://otherSTA.gis.lrg.tum.de/frost/v1.1',
          iot_id: 5
        }
      ]
    },
    {
      lpp_id: 4,
      sta_servers: [{
        sta_url: 'https://otherSTA.gis.lrg.tum.de/frost/v1.1',
        iot_id: 5
      }]
    }
  ]
})

db = db.getSiblingDB('admin')

db.createUser({
  user: 'admin',
  pwd: 'llaBCd0lLLlQunoE7PDtb3x4Psed0N!',
  roles: [
    { role: 'readWriteAnyDatabase', db: 'admin' }
  ]
})