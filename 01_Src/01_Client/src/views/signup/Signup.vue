<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-21 13:29:09                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-22 12:06:44                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './signup.scss';
    import Input from '@/components/input/Input.vue';
    import Button from '@/components/button/Button.vue';
    export default defineComponent({
        name: 'Signup',
        components: {
          Input,
          Button
        },
        props: [],
        computed: {
        },
        mounted() {
          this.next();
        },
        data() {
            return {
              step: 1
            }
        },
        methods: {
          next() {
            const el = document;
            const _this = this;
            el?.addEventListener('keydown', function(e: any) {
              if (e.key === 'Enter') {
                _this.step += 1;
              }
            });
          }
        }
    });
</script>

<template>
    <div id="signup">
      <div v-if="step === 1" class="container" style="align-items: center; gap: 2rem;">
        <div class="title">This is it!</div>
        <div class="subtitle">The first step to becoming an efficient project manager in <i class="blue">Statch</i>.</div>
        <Button id='toStep2' type='prm' size='md' label="Let’s get started!" @click='step = 2' icon='enter' iconPosition='right' />
      </div>
      <div v-if="step === 2" class="container" style="align-items: flex-start; gap: 1.5rem;">
        <Input id="name" placeholder="Enter your name..." type="prm" size="md" isLabel="true" labelText="Your name"/>
        <Button id='toStep3' type='prm' size='md' label="Next" @click='step = 3' icon='arrowright' iconPosition='right' />
      </div>
      <div v-if="step === 3" class="container" style="align-items: flex-start; gap: 1.5rem;">
        <Input id="email" placeholder="Enter your email..." type="prm" size="md" isLabel="true" labelText="Your email"/>
        <Button id='toStep4' type='prm' size='md' label="Next" @click='step = 4' icon='arrowright' iconPosition='right' />
      </div>
      <div v-if="step === 4" class="container" style="align-items: flex-start; gap: 1.5rem;">
        <Input id="pwd" is="password" placeholder="Enter your password..." type="prm" size="md" isLabel="true" labelText="Enter your password"/>
        <Input id="conPwd" is="password" placeholder="Confirm your password..." type="prm" size="md" isLabel="true" labelText="Rewrite your password"/>
        <Button id='toStep5' type='prm' size='md' label="Finish" @click='step = 5' icon='arrowright' iconPosition='right' />
      </div>
      <div v-if="step === 5" class="container" style="align-items: center; gap: 2rem;">
        <div class="title">Completed!</div>
        <div class="subtitle">Just wait for the person in charge to validate your account.</div>
        <a href="/login">
          <div>
            Return to login<i class="icon arrowright"></i>
          </div>
        </a>
      </div>
    </div>
</template>