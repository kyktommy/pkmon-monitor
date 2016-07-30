// modify this

const API = PRODUCTION ? '/map/data' :'http://localhost:8989/map/data'

export default {
  GET_PKMONS_API: API,
  REFRESH_TIME: 1 * 60 * 1000,
  LOCATIONS: [
    { name: 'mk east', loc: [22.320343743143248,114.16914939880371] }, // hk mk east
    { name: 'jordan', loc: [22.305018737102014,114.17163848876953] }, // jordan
    { name: 'tst', loc: [22.298705615987014,114.17245388031006] }, // tst
    { name: 'sheung wan', loc: [22.286078517966256,114.15215492248535] }, // sheung wan
    { name: 'wan chai', loc: [22.2776598189047,114.17275428771973] }, // wan chai
    { name: 'kowloon bay', loc: [22.323599097711785,114.21360969543457] }, // kowloon bay
    { name: 'po lam', loc: [22.32220962639248,114.2574691772461] }, // po lam
    { name: 'tsuen wan', loc: [22.373968007511465,114.1179084777832] }, // tsuen wan
    { name: 'yuen long', loc: [22.446452940412026,114.03486728668213] }, // yuen long
    { name: 'tuen mum', loc: [22.39382875106517,113.97268295288086] }, // tuen mun
    { name: 'kwun tong', loc: [22.312125620053337,114.22639846801758] }, // kwun tong
    { name: 'tai koo', loc: [22.284013600962453,114.21931743621826] }, // tai koo
    { name: 'shai tin', loc: [22.38253962522458,114.19283866882324] }, // shai tin
    { name: 'sheung shui', loc: [22.501773091353762,114.12812232971191] }, // sheung shui
    { name: 'hung hom', loc: [22.306567194930622,114.18485641479491] }, // hung hom
    { name: 'yellow god', loc: [22.34070831009231,114.19249534606934] }, // yellow god
  ]
}
