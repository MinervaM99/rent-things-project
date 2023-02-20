import CreateCategory from "./category/CreatCategory";
import EditCategory from "./category/EditCategory";
import IndexCategory from "./category/IndexCategory";
import CreateItem from "./items/CreateItem";
import EditItem from "./items/EditItem";
import FilterItems from "./items/FilterItems";
import LandingPage from "./items/LandingPage";
import CreateRentalFrequency from "./rentalFrequency/CreateRentalFrequency";
import IndexRentalFrequency from "./rentalFrequency/IndexRentalFrequency";
import NonExistingRoute from "./utils/NonExistingRoute";


const routes = [
  {path: '/category', component: IndexCategory},
  {path: '/category/create', component: CreateCategory},
  {path: '/category/edit/:id(\\d+)', component: EditCategory},

  {path: '/rentalFrequency', component: IndexRentalFrequency},
  {path: '/rentalFrequency/create', component: CreateRentalFrequency},

  {path: '/items/create', component: CreateItem},
  {path: '/items/edit/:id(\\d+)', component: EditItem},
  {path: '/items/filter', component: FilterItems},

  {path: '/', component: LandingPage},
  {path: '*', component: NonExistingRoute}
];

export default routes;