import Vue from 'vue'
import Amplify from 'aws-amplify'
import '@aws-amplify/ui-vue'
import awsExports from '../aws-exports'

Amplify.configure(awsExports)
Vue.use(Amplify)
