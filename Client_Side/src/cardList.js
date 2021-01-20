import CreateIcon from '@material-ui/icons/Create';
import VoteIcon from '@material-ui/icons/HowToVote';
import ResponseIcon from '@material-ui/icons/Forum';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const cards= [
    {
        id: 2,
        heading: "Create Poll",
        description: "Create a polling form.",
        icon: <CreateIcon />,
        route: "/Form",
        background: {backgroundImage: `url(${"https://images.unsplash.com/photo-1518384401463-d3876163c195?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"})`}
    },
    {
        id: 3,
        heading: "Vote",
        description: "Vote too already existing poll.",
        icon: <VoteIcon/>,
        route: "/Vote",
        background: {backgroundPosition:"center left",backgroundImage: `url(${"https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"})`}
    },
    {
        id: 4,
        heading: "View Responses",
        description: "View Responses to the polls created by you.",
        icon: <ResponseIcon/>,
        route: "/Response",
        background: {backgroundPosition:"center bottom",backgroundImage: `url(${"https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"})`}
    },{
        id: 5,
        heading: "Login",
        description: "Login to create new polls or to submit a response.",
        icon: <ExitToAppIcon/>,
        route: "/",
        background: {backgroundPosition:"50% 25%",backgroundImage: `url(${"https://images.unsplash.com/photo-1553895501-af9e282e7fc1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"})`}
    }
]


export default cards;