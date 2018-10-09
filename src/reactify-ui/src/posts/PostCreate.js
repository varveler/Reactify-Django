import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import moment from 'moment'


class PostCreate extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.postTitleRef = React.createRef()
    this.state = {
      title: null,
      draft: false,
      content: null,
      publish: null,
      errors : {}
    }
  }
  createPost(data){
    const endpoint = '/api/posts/'
    const csrfToken = cookie.load('csrftoken')
    let thisComp = this

    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: "POST",
        headers: {
          'Content-Type':'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'
      }


      fetch(endpoint, lookupOptions)
      .then(function(response){
        return response.json()
      }).then(function(responseData){
        console.log(responseData)
        if (thisComp.props.newPostItemCreated){
          thisComp.props.newPostItemCreated(responseData)
        }
        thisComp.clearForm()
      }).catch(function(error){
        console.log("error", error)
      })
    }
  }

  handleSubmit(event){
    event.preventDefault()
    let data = this.state
    if (data['draft'] === 'on') {
      data['draft'] = true
    }else {
      data['draft'] = false
    }
    //console.log(data)
    this.createPost(data)
  }
  handleInputChange(event){
    event.preventDefault()
    console.log(event.target.name, event.target.value )
    let key = event.target.name
    let value = event.target.value
    if ( key === 'title'){
      if(value.length > 10){
        this.state.errors['title'] = 'value to long'
      }

    }
    this.setState({
      [key]: value
    })
  }
  clearForm(event){
    if (event) {
      event.preventDefault()
    }
    this.postCreateForm.reset()
  }
  componentDidMount(){
    this.setState({
      title: null,
      draft: false,
      content: null,
      publish: moment().format('YYYY-MM-DD'),
    })
    this.postTitleRef.current.focus()
  }

  render(){
    const {publish} = this.state
    return (
      <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el}  >
        <div className='form-group'>
          <label for='title'>Post Title</label>
          <input
            type='text'
            id='title'
            name='title'
            className='form-control'
            placeholder='Blog post title'
            ref = {this.postTitleRef}
            onChange={this.handleInputChange}
            required='required'/>
          {(this.state.errors['title']) ?
            <p>{this.state.errors['title']}</p>
          : ''}
        </div>
        <div className='form-group'>
          <label for='content'>Content</label>
          <textarea type='content' id='content' name='content' className='form-control' placeholder='Blog post content'  onChange={this.handleInputChange}  required='required'/>
        </div>
        <div className='form-group'>
          <label for='draft'>Draft
          <input type='checkbox' id='draft' name='draft' onChange={this.handleInputChange}/>
          </label>
        </div>
        <div className='form-group'>
          <label for='publish'>Publish Date </label>
          <input type='date' value={publish} id='publish' name='publish' className='form-control' onChange={this.handleInputChange} required='required' />
          <button className='btn btn-primary'>Save</button>
          <button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>
        </div>
      </form>
    )
  }
}

export default PostCreate;
