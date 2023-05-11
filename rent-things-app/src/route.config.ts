import CreateCategory from "./category/CreatCategory";
import EditCategory from "./category/EditCategory";
import IndexCategory from "./category/IndexCategory";
import CreateItem from "./items/CreateItem";
import EditItem from "./items/EditItem";
import FilterItems from "./items/FilterItems";
import LandingPage from "./home/LandingPage";
import LoginForm from "./login/LoginForm";
import NonExistingRoute from "./utils/NonExistingRoute";


const routes = [
  {path: '/category', component: IndexCategory, isAdmin: true},
  {path: '/category/create', component: CreateCategory, isAdmin: true},
  {path: '/category/edit/:id', component: EditCategory, isAdmin: true},

  {path: '/login/lgin', component: LoginForm},

  {path: '/items/create', component: CreateItem},
  {path: '/items/edit/:id', component: EditItem},
  {path: '/items/filter', component: FilterItems},

  {path: '/', component: LandingPage},
  {path: '*', component: NonExistingRoute}
];

export default routes;