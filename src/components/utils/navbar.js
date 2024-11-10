const navbar = [
    {
        id:1,
        title:'BoshSahifa',
        path:'/bosh-sahifa',
        isPrivate:true,
        element:'',
        role:["admin"],
    },
    {
        id:2,
        title:'Sanoat',
        path:'/sanoat',
        isPrivate:true,
        element:'',
        role:["admin"],
        children:[
            {
                id:'2-1',
                title:'Automobil Sanoati',
                path:'/automobil-sanoati',
                isPrivate:true,
                element:'',
                role:["admin"],   
            },
            {
                id:'2-2',
                title:'Atmosfera havosini kuzatish tizimlari',
                path:'/atmosfera',
                isPrivate:true,
                element:'',
                role:["admin"],   
            },
            {
                id:'2-3',
                title:'Emmisiya monitoringi tizimlari',
                path:'/emmisiya',
                isPrivate:true,
                element:'',
                role:["admin"],   
            },
            {
                id:'2-4',
                title:'Yoqilgi katolizatorlari',
                path:'/yoqilgi',
                isPrivate:true,
                element:'',
                role:["admin"],   
            },
            {
                id:'2-5',
                title:'Namlik monitoringi',
                path:'/namlik',
                isPrivate:true,
                element:'',
                role:["admin"],   
            },
            {
                id:'2-6',
                title:'Siqilgan havo va gazlarni texnologiyasi',
                path:'/havo',
                isPrivate:true,
                element:'',
                role:["admin"],   
            },

        ]
    },
    {
        id:3,
        title:'Aloqa',
        path:'/aloqa',
        isPrivate:true,
        element:'',
        role:["admin"],
    },
]


export default navbar