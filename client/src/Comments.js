import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import './Comments.css';

class Comments extends Component {
  state = {
    username: '',
    newComment: '',
    comments: [],
  };

  updateInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  postComment = event => {
    event.preventDefault();
    const { username, newComment } = this.state;
    if (username.trim() === '' || newComment.trim() === '') return;

    const data = {
      name: username,
      text: newComment,
      votes: 0,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/comment`, data)
      .then(() => {
        this.setState({
          username: '',
          newComment: '',
        });
      })
      .catch(error => console.log(error));
  };

  vote = (id, num) => {
    axios.post('/vote', {
      id,
      vote: num,
    });
  };

  componentDidMount() {
    const pusher = new Pusher('93d5b6db6095187f5ef6', {
      cluster: 'us2',
      encrypted: true,
    });

    axios.get(process.env.REACT_APP_API_URL).then(({ data }) => {
      this.setState({
        comments: [...data],
      });
    }).catch(error => console.log(error))

    const channel = pusher.subscribe('comments');
    channel.bind('new-comment', data => {
      console.log('bind called');
      this.setState(prevState => {
        const { comments } = prevState;

        console.log("comments: ");
        console.log(comments)
        console.log("data.comment: ");
        console.log(data.comment);

        /* a-t solution */
        const commentsCopy = Array.from(comments);

        console.log("commentsCopy before: ");
        console.log(commentsCopy)

        commentsCopy.push(data.comment);

        console.log("commentsCopy after: ");
        console.log(commentsCopy)
        /* END a-t solution */

        /* original code */
        // comments.push(data.comment);

        // console.log("comments after: ");
        // console.log(comments);
        /* END original code */

        return {
          comments: commentsCopy, // a-t
          // comments, // original
        };
      });
    });
    channel.bind('new-vote', data => {
      let { comments } = this.state;
      comments = comments.map(e => {
        if (e._id === data.comment._id) {
          return data.comment;
        }
        return e;
      });
      this.setState({
        comments,
      });
    });
  }

  render() {
    const { username, newComment, comments } = this.state;

    const userComments = comments.map(e => (
      <article className="comment" key={e._id}>
        <h1 className="comment-user">{e.name}</h1>
        <p className="comment-text">{e.text}</p>
        <div className="voting">
          <div className="vote-buttons">
            <button className="upvote" onClick={() => this.vote(e._id, 1)}>
              Upvote
            </button>
            <button className="downvote" onClick={() => this.vote(e._id, -1)}>
              Downvote
            </button>
          </div>
          <div className="votes">Votes: {e.votes}</div>
        </div>
      </article>
    ));

    return (
      <div className="App">
        <article className="post">
          <h1>Interesting Video</h1>
          <iframe
            title="video"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/PC60fAKJiek"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <p>Leave a comment if you enjoyed the video above</p>
        </article>
        <section className="comments-form">
          <form onSubmit={this.postComment}>
            <label htmlFor="username">Name:</label>
            <input
              className="username"
              name="username"
              id="username"
              type="name"
              value={username}
              onChange={this.updateInput}
            />

            <label htmlFor="new-comment">Comment:</label>
            <textarea
              className="comment"
              name="newComment"
              id="new-comment"
              value={newComment}
              onChange={this.updateInput}
            />
            <button type="submit">Have your say</button>
          </form>
        </section>
        <section className="comments-section">{userComments}</section>
      </div>
    );
  }
}

export default Comments;