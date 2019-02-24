// post list
const vuePosts = new Vue ({
    el: "#posts",
    data: {
        posts: []
    },
    mounted() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then((data) => {
                this.posts = data;
            }
        )
    },
    template: ` 
        <div>
            <section v-for="post in posts.slice(0, 10)">
                <article>
                    <h2>{{post.title}}</h2>
                    <p>{{post.body}}</p>
                    <a class="read--more" :href="'post.html?postID=' + post.id">Read more <i class="fas fa-arrow-right"></i></a>
                </article>
            </section>
        </div>
    `
})

// single post and comments
let uri = window.location.search.substring(1)
let params = new URLSearchParams(uri)
let postID = params.get("postID")

// single post
const vuePost = new Vue({
    el: '#post',
    data: function(){
        return {
            title: '',
            body: ''
        }
    },
    mounted() {
        var self = this;
        axios.get("https://jsonplaceholder.typicode.com/posts/" + postID)
        .then(function (response) {
            self.title = response.data['title'];
            self.body = response.data['body'];
        })
    },
    template: ` 
        <div>
            <h1>{{title}}</h1>
            <p>{{body}}</p>
        </div>
    `
})

// comments
const vueComments = new Vue({
    el: '#comments',
    data: {
        comment: []
    },
    mounted() {  
        fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postID)
            .then(response => response.json())
            .then((data) => {
                this.comment = data;
            }
        )
    },
    template: ` 
        <div>
            <h3>Comments:</h3>
            <div v-for="data in comment">
                Name: <strong>{{data.name}}</strong><br />
                Email: <strong><a :href="'mailto:'+ data.email">{{data.email}}</a></strong>
                <p>{{data.body}}</p>
            </div>
        </div>
    `
})