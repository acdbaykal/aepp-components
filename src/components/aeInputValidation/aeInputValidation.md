```javascript
new Vue({
  data:{
    inputValue: 'Initial value',
    errMsg:''
  },
 template: `
  <div>
      <ae-input-validation
        @validation="onValidationResult"
        :validateOnBlur="validate"
        :validateOnInput="validate"
      >
        <ae-input v-model="inputValue" placeholder="Test input"/>
      </ae-input-validation>
      <p>{{errMsg}}</p>
  </div>
  `,
  methods: {
      validate(value){
        const inValid = /\D/.test(value)
        if(inValid){
         return 'Only digits are allowed'
        }
      },
      onValidationResult(result){
        this.errMsg = typeof result === 'string' ? result : ''
      }
  },
  mounted (){
            const _this = this
            setTimeout(function(){
              console.log('timeout')
              _this.inputValue = '1234567' 
            }, 5000)
  } 
})
```

```javascript
new Vue({
  data:{
    inputValue: 'Initial value',
    errMsg:''
  },
 template: `
  <div>
      <ae-input-validation
        @validation="onValidationResult"
        :validateOnBlur="validate"
        :validateOnInput="validate"
      >
        <input v-model="inputValue" placeholder="Test input"/>
      </ae-input-validation>
      <p>{{errMsg}}</p>
  </div>
  `,
  methods: {
      validate (value) {
        const inValid = /\D/.test(value)
        if(inValid){
         return 'Only digits are allowed'
        }
      },
      onValidationResult (result) {
        console.log('validation result: ', result)
        this.errMsg = typeof result === 'string' ? result : ''
      }
  },
  mounted (){
          const _this = this
          setTimeout(function(){
            console.log('timeout')
            _this.inputValue = '1234567' 
          }, 5000)
  }
})
```
