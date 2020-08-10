import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Dashboard from '@/views/dashboard/BasicDashboard';
import Profile from '@/views/pages/Profile';
import Layout from '@/layouts/Layout';
import CadastroPaciente from '@/views/pages/CadastroPaciente';
import Atendimento from '@/views/pages/Atendimento';
import CadastroProcedimento from '@/views/pages/CadastroProcedimentoMedico';
import ImportCSVFile from '@/views/pages/ImportCsvFile';

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: 'dashboard',
            component: Layout,
            children: [                

                {
                    name: 'Profile',
                    path: 'profile',
                    component: Profile,
                },

                {
                    name: 'Dashboard',
                    path: 'dashboard',
                    component: Dashboard,
                },
                {
                    name:'Create patient',
                    path: 'create-patient',
                    component: CadastroPaciente
                },
                {
                    name:'attendance',
                    path: 'attendance/new',
                    component: Atendimento
                },
                {
                    name: 'procedure',
                    path: 'procedure/new',
                    component: CadastroProcedimento
                },
                {
                    name: 'importCSV',
                    path: 'import-csv-file/',
                    component: ImportCSVFile
                }

            ]
        },

    ],
})