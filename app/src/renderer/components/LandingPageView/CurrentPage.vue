<template>
  <div>
    <p>
      You are currently at <code>`{{ $route.path }}`</code> on the <code>`{{ $route.name }}`</code> view.
    </p>

    <div class="drag">
      <h2>Mongo Collections</h2>
      <h3>Connected: {{ connected }}</h3>
      <draggable class="dragArea" :list="collections" :options="{group:'people'}" @change="log">
        <div v-for="(element, index) in collections">{{element.name}}</div>
      </draggable>
    </div>

    <div class="normal">
      <h2>Collections v-for</h2>
      <div>
        <div v-for="element in collections">{{element.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import store from '../../vuex/store'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      draggable
    },
    data() {
      return {
        // list1: [
        //   { name: 'John', id: 1 },
        //   { name: 'Joao', id: 2 },
        //   { name: 'Jean', id: 3 },
        //   { name: 'Gerard', id: 4 }
        // ]
      }
    },
    computed: {
      collections () {
        return this.$store.getters.mongoCollections.slice() // clone
      },
      ...mapGetters({
        // map this.xxx to store.getters.xxx
        connected: 'mongoConnected'
      })
    },
    methods: {
      // add: function () {
      //   this.list.push({ name: 'Juan' })
      // },
      // replace: function () {
      //   this.list = [{ name: 'Edgard' }]
      // },
      // clone: function (el) {
      //   return {
      //     name: el.name + ' cloned'
      //   }
      // },
      log: function (evt) {
        console.log(evt)
        store.dispatch('incrementMain')
        console.log(store.getters.mainCounter)
      }
    },
    created() {
      store.dispatch('connect')
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'landing-page',
          path: '/landing-page'
        }
      }
    }
  }

</script>

<style scoped>
  code {
    background-color: rgba(40, 56, 76, .5);
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    padding: 3px 6px;
    margin: 0 3px;
    vertical-align: bottom;
  }

  p {
    line-height: 24px;
  }
</style>
