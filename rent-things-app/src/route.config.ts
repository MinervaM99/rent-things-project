import CreateCategory from "./category/CreatCategory";
import EditCategory from "./category/EditCategory";
import IndexCategory from "./category/IndexCategory";
import CreateItem from "./items/CreateItem";
import EditItem from "./items/EditItem";
import FilterItems from "./items/FilterItems";
import LandingPage from "./home/LandingPage";
import NonExistingRoute from "./utils/NonExistingRoute";
import Register from "./security/Register";
import Login from "./security/Login";
import ItemDetails from "./items/ItemDetails";
import MyAccount from "./myAccount/MyAccount";
import IndexUsers from "./security/IndexUsers";
import UserProfile from "./myAccount/UserProfile";

const routes = [
  {path: '/category', component: IndexCategory, isAdmin: true},
  {path: '/category/create', component: CreateCategory, isAdmin: true},
  {path: '/category/edit/:id', component: EditCategory, isAdmin: true},

  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/users', component: IndexUsers, isAdmin: true},
 


  {path: '/items/create', component: CreateItem,isUser: true},
  {path: '/items/edit/:id', component: EditItem,isUser: true},
  {path: '/items/filter', component: FilterItems},
  {path: '/item/:id', component: ItemDetails},

  {path: '/myAccount', component: MyAccount,isUser: true},
  {path: '/account/:userName', component: UserProfile},

  {path: '/', component: LandingPage},
  {path: '*', component: NonExistingRoute}
];

export default routes;