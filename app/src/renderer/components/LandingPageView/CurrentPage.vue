<template>
  <div>
    <p>
      You are currently at <code>`{{ $route.path }}`</code> on the <code>`{{ $route.name }}`</code> view.
    </p>

    <div class="drag">
      <h2>List 1 draggable</h2>
      <draggable class="dragArea" :list="list1" :options="{group:'people'}" @change="log">
        <div v-for="(element, index) in list1">
          {{element.name}} {{index}}
        </div>
      </draggable>

      <h2>List 2 draggable</h2>
      <draggable class="dragArea" :list="list2" :options="{group:'people'}" @change="log">
        <div v-for="(element, index) in list2" :key="index">{{element.name}}</div>
      </draggable>
    </div>

    <div class="normal">
      <h2>List 1 v-for</h2>
      <div>
        <div v-for="element in list1">{{element.name}}</div>
      </div>

      <h2>List 2 v-for</h2>
      <div>
        <div v-for="element in list2">{{element.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import store from '../../vuex/store'

  export default {
    components: {
      draggable
    },
    data() {
      return {
        list1: [
          { name: 'John', id: 1 },
          { name: 'Joao', id: 2 },
          { name: 'Jean', id: 3 },
          { name: 'Gerard', id: 4 }
        ],
        list2: [
          { name: 'Juan', id: 5 },
          { name: 'Edgard', id: 6 },
          { name: 'Johnson', id: 7 }
        ]
      }
    },
    methods: {
      add: function () {
        this.list.push({ name: 'Juan' })
      },
      replace: function () {
        this.list = [{ name: 'Edgard' }]
      },
      clone: function (el) {
        return {
          name: el.name + ' cloned'
        }
      },
      log: function (evt) {
        console.log(evt)
        store.dispatch('incrementMain')
        console.log(store.getters.mainCounter)
      }
    },
    created() {
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
