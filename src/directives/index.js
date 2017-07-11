import { deCentralization } from '@/utils'
export default deCentralization(require.context('./', false, /\w+.js$/))