import React  from "react";
import useSytles from "./styles";
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import moment from "moment"
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { deletePost,likePost } from "../../../actions/posts"
import { useDispatch } from "react-redux";

const Post = ({post,setCurrentId}) => {
    const classes = useSytles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `你和 ${post.likes.length - 1} 人` : `${post.likes.length} 喜欢${post.likes.length > 1 ? '' : ''}` }</>
            ) : (//既不是googleId也不是自定义Id 游客
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? '喜欢' : '喜欢'}</>
            );
        }
       // 如果你是第一个喜欢的人
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;喜欢</>;
      };
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.created).fromNow()}</Typography>
            </div>
            {
                  (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{color:'white'}} size="small" onClick={() => {setCurrentId(post._id)}}>
                            <MoreHorizIcon fontSize="medium"/>
                        </Button>
                    </div>
                  )
            }
           
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) =>`#${tag}`)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => {dispatch(likePost(post._id))}}>
                   <Likes/>
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                            <DeleteIcon fontSize="medium"/>
                            &nbsp; 删除 &nbsp;
                        </Button>
                    )
                }
               
            </CardActions>
        </Card>
    )
}

export default Post;