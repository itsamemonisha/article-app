import Axios from 'axios'
import React, { Component } from 'react'
import ShowPost from './ShowPost/ShowPost'
import img1 from '../../assets/asset-1.png'
import ShowUser from '../Users/ShowUsers/ShowUser'
import Spinner from '../../Containers/Spinner/Spinner'

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            users: [],
            isloading: false
        }

    }

    componentDidMount() {
        this.setState(pre => ({
            isloading: true
        }))
        Promise.all([
            Axios.get('/posts'),
            Axios.get('/profile/profiles')
        ]).then(data => {
            this.setState(pre => ({
                isloading: false
            }))
            this.setState({ ...this.state.posts, posts: data[0].data.posts });
            this.setState({ ...this.state.users, users: data[1].data.profile });
        })
            .catch(e => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
    }

    render() {
        let isLoading
        if (this.state.isloading) {
            isLoading = <Spinner />
        }
        let fetchedposts
        let allUsers
        if (this.state.posts) {
            fetchedposts = this.state.posts.map((post, index) => (
                <ShowPost key={index} {...post} {...index} />
            ))
        }
        if (this.state.users) {
            allUsers = this.state.users.map((user, index) => (
                <ShowUser key={index} {...user} {...index} />
            ))
        }
        return (
            <div>

                <div className="container hero">
                    <div className="row align-items-center text-center text-md-left">
                        <div className="col-lg-4">
                            <h1 className="mb-3 display-3">
                                Write about what you love!
                    </h1>
                            <p>
                                Economics, Technology, Sports, Science and more
                    </p>
                        </div>
                        <div className="col-lg-8">
                            <img src={img1} className="img-fluid" alt="img" />
                        </div>
                    </div>


                </div>
                <div className="container hero py-5">
                    <div className="row">
                        <div className="col-md-12 col-sm-6">
                            <div className="row">
                                {fetchedposts}
                            </div>
                        </div>


                    </div>
                </div>

                <div className="container loading">
                    {isLoading}
                </div>
            </div>
        )
    }
}

export default Posts