<template>
    <div id="header">
          <Button v-if=show icon="home" type="ghost" @click="handleSubmit()"></Button>  
          <Button v-if=show icon="ios-arrow-back" type="ghost" @click="handleReturn()"></Button>  
         <Button id="close-icon" icon="close" type="ghost" @click="closeWindow()"></Button> 
    </div>
</template>
<script>
import {ipcRenderer} from 'electron'
export default {
    name: 'mheader',
    props: {
        show:Boolean,
        default: true
    },
    methods: {
        handleSubmit : function() {
          this.$router.push('/main')
        },
        handleReturn : function() {
            this.$router.go(-1)
        },
        closeWindow: function() {
            ipcRenderer.send('close-window')
        }
    },
    computed: {
    }
}
</script>
<style>
#header {
    margin:20px 50px 100px 50px;
    -webkit-app-region: drag;
    overflow: hidden
}
Button {
    -webkit-app-region: no-drag;
}
#close-icon {
    float: right
}
</style>