<template>
  <div>
    <h2>登録</h2>
    <label for="email">Email:</label>
    <input id="email" type="text" v-model="email">
    <br><br>
    <label for="password">パスワード:</label>
    <input id="password" type="password" v-model="password">
    <br><br>
    <button @click="register">送信</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      comment: "",
    };
  },
  methods:{
    register(){
      
    }
  }
}
</script>