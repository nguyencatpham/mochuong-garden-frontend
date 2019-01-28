export default {
  api: {
    authen: {
      host: 'https://api-dev.onskycloud.com/authen/v1/api',
      login: 'auth/login',
      info: 'auth/me',
      register: 'customers',
      group: 'groups',
      user: 'users',
      usersByGroup: 'bygroup',
      groupsByUser: 'byuser',
      confirmEmail: 'customers/activate',
    },
    policy: {
      // host: 'http://localhost:8080/v1/api',
      host: 'https://api-dev.onskycloud.com/policy-service/v1/api',
      token: 'sdcxcx22334632rwhczyr392yr02ud23r9t34uy23r9t3df932jhfo',
      policy: 'policies',
      group: 'groups',
      user: 'users',
    },
    resource: {
      // host: 'http://localhost:8080/v1/api',
      host: 'https://api-dev.onskycloud.com/resource-service/v1/api',
      token: 'sdfiusfi98234632rwhczyr392yr02u-23r9t34uy23r9t3fsfskhfo',
      service: 'services',
      serviceSummary: 'summary',
      serviceGetByShortName: 'shortname',
      serviceGetActions: 'actions',
      serviceCreate: 'register',
      serviceDisable: 'disable',
      serviceEnable: 'enable',
      serviceDelete: 'shortname',
      serviceDeletes: 'deletes',
    },
    iot: {
      host: 'https://api-dev.onskycloud.com/iot-service/v1/api',
      certificate: 'certificates',
      configures: 'configures',
      policies: 'policies',
      priority: 'priorities',
      project: 'projects',
      //template
      template: 'thing-templates',
      templateProperty: 'property-templates',
      alertTemplate: 'alert-templates',
      //thing
      thing: 'things',
      thingProperty: 'thing-properties',
      alertThing: 'property-alerts',
    },
    configure: {
      host: 'https://api-dev.onskycloud.com/iot-service/v1/api',
      dataType: 'configures/data-types',
      alertType: 'configures/alert-types',
      priority: 'priorities',
      thingType: 'configures/thing-types',
      iotAction: 'configures/iot-actions',
    },
    upload: {
      host: 'https://api-dev.onskycloud.com/storage-service/v1/api/storages',
    },
  },
}
