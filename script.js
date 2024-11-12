let burger = document.getElementById('burger');
let navbar = document.querySelector('.navbar');

burger.addEventListener('click',()=>{
    // navbar.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp')
    console.log("clicked")
})

function searchBlogs() {
    const input = document.getElementById("blogSearch").value.toLowerCase();
    const blogPosts = document.querySelectorAll(".blog-post");
    
    blogPosts.forEach(post => {
        const title = post.getAttribute("data-title").toLowerCase();
        const content = post.getAttribute("data-content").toLowerCase();
        
        if (title.includes(input) || content.includes(input)) {
            post.style.display = "block"; // Show post
        } else {
            post.style.display = "none"; // Hide post
        }
    });
}