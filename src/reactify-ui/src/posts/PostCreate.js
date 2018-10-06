import React, {Component} from 'react'

class PostCreate extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      title: null,
      draft: false,
      content: null,
      publish: null,
      errors : {}
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
    console.log(data)
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
  componentDidMount(){
    this.setState({
      title: null,
      draft: false,
      content: null,
      publish: null,
    })
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label for='title'>Post Title</label>
          <input type='text' id='title' name='title' className='form-control' placeholder='Blog post title' onChange={this.handleInputChange} required='required'/>
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
          <input type='date' id='publish' name='publish' className='form-control' onChange={this.handleInputChange} required='required' />
          <button className='btn btn-primary'>Save</button>
        </div>
      </form>
    )
  }
}

export default PostCreate;
