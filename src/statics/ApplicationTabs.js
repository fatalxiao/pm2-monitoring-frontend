export default [{
    title: 'Overview',
    getRoute: name => `/app/pm/application/${name}/overview`
}, {
    title: 'Config',
    getRoute: name => `/app/pm/application/${name}/config`
}, {
    title: 'Setting',
    getRoute: name => `/app/pm/application/${name}/setting`
}];
