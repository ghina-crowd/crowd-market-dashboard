import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'project',
                title: 'Statistics',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/dashboards/project'
            },

            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },

            {
                id: 'categories',
                title: 'Categories',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/categories'
            },

            {
                id: 'meals',
                title: 'Products',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'add_box',
                        title: 'New Box',
                        type: 'item',
                        url: '/pages/box/0'
                    },
                    {
                        id: 'add_meal',
                        title: 'New Product',
                        type: 'item',
                        url: '/pages/product/0'
                    },
                    {
                        id: 'meals',
                        title: 'Products',
                        type: 'item',
                        url: '/pages/products'
                    }
                ]
            },

            {
                id: 'orders',
                title: 'Orders',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/orders'
            },


            {
                id: 'stores',
                title: 'Stores',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'add_kitchen',
                        title: 'New Store',
                        type: 'item',
                        url: '/pages/store/0'
                    },
                    {
                        id: 'farmers',
                        title: 'Stores',
                        type: 'item',
                        url: '/pages/stores'
                    }
                ]
            },

            {
                id: 'countries',
                title: 'Countries',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/countries'
            },

            {
                id: 'cities',
                title: 'Cities',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/cities'
            },

            {
                id: 'unites',
                title: 'Unites',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/unites'
            },
            {
                id: 'types',
                title: 'Types',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/types'
            },

            {
                id: 'banners',
                title: 'Banners',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/banners'
            },


            {
                id: 'profit',
                title: 'Profits',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/profits'
            },

            {
                id: 'users',
                title: 'Users',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'new_users',
                        title: 'New User',
                        type: 'item',
                        url: '/pages/new_user'
                    },
                    {
                        id: 'users',
                        title: 'Users',
                        type: 'item',
                        url: '/pages/users'
                    }
                ]
            },
            {
                id: 'coupons',
                title: 'Coupons',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/coupons'
            },
            {
                id: 'requests',
                title: 'Notifications',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/notifications'
            },

            {
                id: 'contact-us',
                title: 'Contact Us',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/contact_us'
            },

        ]
    }
];

export const navigationSP: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'project',
                title: 'Statistics',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/dashboards/project'
            },
            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },

            // {
            //     id: 'product',
            //     title: 'Products',
            //     type: 'collapsable',
            //     icon: 'dashboard',
            //     children: [
            //         {
            //             id: 'add_box',
            //             title: 'New Box',
            //             type: 'item',
            //             url: '/pages/box/0'
            //         },
            //         {
            //             id: 'add_produst',
            //             title: 'New Product',
            //             type: 'item',
            //             url: '/pages/product/0'
            //         },
            //         {
            //             id: 'products',
            //             title: 'Products',
            //             type: 'item',
            //             url: '/pages/products'
            //         }
            //     ]
            // },


            {
                id: 'orders',
                title: 'Orders',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/orders'
            },

            // {
            //     id   : 'profit',
            //     title: 'Profits',
            //     type : 'item',
            //     icon     : 'dashboard',
            //     url  : '/pages/profits'
            // },

            {
                id: 'requests',
                title: 'Notifications',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/notifications'
            },


        ]
    }
]


export const navigationDriver: FuseNavigation[] = [{
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
        {
            id: 'project',
            title: 'Statistics',
            type: 'item',
            icon: 'dashboard',
            url: '/apps/dashboards/project'
        }
,
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            icon: 'dashboard',
            url: '/pages/orders'
        },


    ]
   }
]



