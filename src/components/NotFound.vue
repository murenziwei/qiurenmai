<template>
  <main class="notfound">
  

  <form :class="{active:(output==100?true:false)}">
    <div class="range">
      <input name="range" type="range" min="0" :max="maxvalue" @input='outfn'>
      
      <div class="range-output">
        
        <output class="output" name="output" for="range" :value='output' @click='navfn' >
          {{outvalue}}
        </output>
      </div>
    </div>
  </form>
  <div>
    
    <h1>404！！</h1>

  </div>
  </main>
</template>

<script>

export default {
  name: 'NotFound',
  props: {
    msg: String
  },
  data(){
    return {
      output:0,
      maxvalue:100000,
      outvalue:'回到首页，已充满0%能量'
    }
  },
  methods:{
    outfn(e){
      this.output=Math.round(e.srcElement.valueAsNumber)/1000;

      if(this.output==100){this.outvalue='充满成功！回到首页';}else{
      this.outvalue='回到首页，已充满'+this.output+'%能量';
      }

    },
    navfn(){
       if(this.output==100){window.location.href='/'}
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.active .range .range-output .output{
  background-color:red;
}
.active .range .range-output .output:before{
  border-top-color:red;
}
.notfound{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  width:100%;
  height:100%;
  background-image:url('../assets/87F58PICa758PIChD9tcerdSQ_PIC2018.png');
  background-size:100px;

}
.range {
  position: relative;
}
.range input[type=range] {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  padding: 0;
  width: 100%;
  height: 22px;
  cursor: pointer;
  display: block;
}
.range input[type=range]:focus {
  outline: none;
}
.range input[type=range][disabled] {
  opacity: .3;
  cursor: default;
}
.range .rangeslider {
  position: relative;
  height: 22px;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.range .rangeslider:before {
  box-sizing: border-box;
  width: 100%;
  height: 4px;
  background: #e6e6e6;
  border-radius: 100px;
  content: "";
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
.range input::-webkit-slider-runnable-track {
  box-sizing: border-box;
  width: 100%;
  height: 4px;
  background: #e6e6e6;
  border-radius: 100px;
  margin: 11px 0;
}
.range input::-moz-range-track {
  box-sizing: border-box;
  width: 100%;
  height: 4px;
  background: #e6e6e6;
  border-radius: 100px;
  margin: 11px 0;
}
.range input::-ms-track {
  box-sizing: border-box;
  width: 100%;
  height: 4px;
  background: #e6e6e6;
  border-radius: 100px;
  color: transparent;
  padding: 11px 0;
  background: transparent;
  border-color: transparent;
}
.range input::-ms-fill-lower,
.range input::-ms-fill-upper {
  box-sizing: border-box;
  width: 100%;
  height: 4px;
  background: #e6e6e6;
  border-radius: 100px;
}
.range input::-ms-fill-lower {
  background: #60cd18;
}
.range .rangeslider-fill-lower {
  background-color: #60cd18;
  border-radius: 100px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  height: 4px;
  will-change: width;
}
.range input::-webkit-slider-thumb {
  box-sizing: border-box;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
  border: 6px solid #fff;
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: #333940;
  cursor: pointer;
  -webkit-appearance: none;
          appearance: none;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  margin-top: 2px;
}
.range input::-moz-range-thumb {
  box-sizing: border-box;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
  border: 6px solid #fff;
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: #333940;
  cursor: pointer;
}
.range input::-ms-thumb {
  box-sizing: border-box;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
  border: 6px solid #fff;
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: #333940;
  cursor: pointer;
}
.range .rangeslider-thumb {
  box-sizing: border-box;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.5);
  border: 6px solid #fff;
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background: #333940;
  cursor: pointer;
  position: absolute;
  -ms-touch-action: pan-x;
      touch-action: pan-x;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  will-change: left;
}
.range .range-output {
  position: relative;
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: -webkit-transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.range .range-output .output {
  display: block;
  position: relative;
  height: 80px;
  line-height: 80px;
  min-width: 50px;
  padding: 0 20px;
  top: -120px;
  background: #383c42;
  color: #fff;
  border-radius: 100px;
  white-space: nowrap;
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
  margin:auto;
}
.range .range-output .output:before {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  border: 10px solid #383c42;
  border-bottom: none;
  border-left-color: transparent;
  border-right-color: transparent;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}

body {
  font-family: Helvetica Neue, Helvetica, Arial;
  font-weight: 300;
}

main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction:column;
  height: 300px;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  color: #333;
}

form {
  max-width: 500px;
  min-width: 320px;
}

h2 {
  font-weight: 300;
  text-align: center;
  margin-bottom: 30px;
}

</style>
