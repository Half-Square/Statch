<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-22 11:32:10                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-27 16:16:40                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './project.scss';
    import ProgressBar from "@/components/progressBar/ProgressBar.vue";
    import Avatar from "@/components/avatar/Avatar.vue";
    import Comment from "@/compositions/comment/Comment.vue";
    import Input from "@/components/input/Input.vue";
    import Button from "@/components/button/Button.vue";
    import Label from "@/components/label/Label.vue";
    import Status from '@/components/status/Status.vue';

    export default defineComponent({
        name: 'Project',

        components: {
          ProgressBar,
          Avatar,
          Comment,
          Input,
          Button,
          Label,
          Status
        },

        computed: {},
        
        data() {
            return {
              elements: [
                {status: "done", id: "dc5c7a1", desc: "lorem ipsum...", level: "high", img: "", url: "/create", name: "Randy"},
                {status: "new", id: "dc5c7a1", desc: "lorem ipsum...", level: "low", img: "", url: "/create", name: "Toto"},
                {status: "new", id: "dc5c7a1", desc: "lorem ipsum...", level: "moderate", img: "", url: "/create", name: "Tata"},
                {status: "progress", id: "dc5c7a1", desc: "lorem ipsum...", level: "high", img: "", url: "/create", name: "Oui"},
                {status: "progress", id: "dc5c7a1", desc: "lorem ipsum...", level: "high", img: "", url: "/create", name: "Non"},
                {status: "wait", id: "dc5c7a1", desc: "lorem ipsum...", level: "normal", img: "", url: "/create", name: "Oh"},
                {status: "reject", id: "dc5c7a1", desc: "lorem ipsum...", level: "normal", img: "", url: "/create", name: "Ah"},
              ],
              activity: [
                {img: "0", alt: "oui", name: "Randy", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
                {img: "0", alt: "oui", name: "Toto", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
                {img: "0", alt: "oui", name: "Tata", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
                {img: "0", alt: "oui", name: "Oui", action: "created", id: "dc5c7a1", url: "/create", time: "10 min"},
              ],
              comments: [
                {    
                  "id": "6389f8dcf9f5d32a98630c85",
                  "author": {
                    "_id": "638773e22ef2f4b210dc0fa7",
                    "name": "Jean-Baptiste",
                    "lastName": "BRISTHUILLE",
                    "email": "jbristhuille@gmail.com",
                    "image": ""
                  },
                  "created": "1669986524",
                  "content": "Hello world"
                },
                {
                  "id": "6389f8f48350bb19ecb8225f",
                  "author": {
                    "_id": "638773e22ef2f4b210dc0fa7",
                    "name": "Jean-Baptiste",
                    "lastName": "BRISTHUILLE",
                    "email": "jbristhuille@gmail.com",
                    "image": ""
                  },
                  "created": "1669986549",
                  "content": "Hello world"
                },
              ]
            }
        },

        methods: {
          newComment() {
            let value: any = this.$refs.newCommentContent
            value = value.$data.value
            console.log(value);
          }
        }
    });
</script>

<template>
  <div id="project">
    <div class="project">
      <div class="main">
        <header>
          <h1>Cooking app</h1>
          <h2>Description</h2>
          <p>Lorem</p>
        </header>
        <div class="advancement">
          <ProgressBar id="test" value="15" />
          <div class="elements">
            <a class="element" v-for="element in elements" :href="element.url">
              <div class="block">
                <div class="status"><Status :status="element.status" /></div>
                <div class="id">{{ element.id }}</div>
                <div class="desc">{{ element.desc }}</div>
              </div>
              <div class="block">
                <Label :level="element.level" />
                <Avatar :id="element.name" />
              </div>
            </a>
          </div>
        </div>
        <div class="comments">
          <h2>Comments</h2>
          <Comment 
            v-for="comment in comments"
            :id="comment.id"
            :name="comment.author.name"
            :lastName="comment.author.lastName"
            :content="comment.content"
            :created="comment.created"
          />
          <div class="commentInput">
            <Input id="newCommentContent" ref="newCommentContent" placeholder="Add comment..." />
            <Button id='newComment' type='scnd' size='md' label='Post' @click='newComment' />
          </div>
        </div>
      </div>
      <aside>
        <div class="details">
          <h3>Details</h3>
          <div class="container">
            <h4>Assignee</h4>
            <div class="text">
              <Avatar id="randy" />
              Randy Gouse
            </div>
          </div>
          <div class="container">
            <h4>Owner</h4>
            <div class="text">
              <Avatar id="madelyn" />
              Madelyn Press
            </div>
          </div>
          <div class="container">
            <h4>Version</h4>
            <div class="text">0.10</div>
          </div>
          <div class="container">
            <h4>Status</h4>
            <div class="text"><Status status="progress" /> In progress</div>
          </div>
          <div class="container">
            <h4>No. of tasks</h4>
            <div><a href="/create">4 tasks <i class="icon arrowright"></i></a></div>
          </div>
          <div class="container">
            <h4>No. of tickets</h4>
            <div><a href="/create">14 tickets <i class="icon arrowright"></i></a></div>
          </div>
          <div class="container">
            <h4>No. of docs</h4>
            <div><a href="/create">5 docs <i class="icon arrowright"></i></a></div>
          </div>
          <div class="container">
            <h4>Created</h4>
            <div class="text">Jun 10</div>
          </div>
        </div>
        <div class="activity">
          <h3>Last activity</h3>
          <div class="content" v-for="item in activity">
            <div class="img"><Avatar :id="item.name" /></div>
            <div class="name">{{ item.name }}</div>
            <div class="desc">{{ item.action }} <a :href="item.url">{{ item.id }}</a>, {{ item.time }} ago</div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>