import { AuthorController } from "./controller/AuthorController"
import { BooksController } from "./controller/BooksController"
import { UserController } from "./controller/UserController"
import { CategoryController } from './controller/CategoryController';

export const Routes = [
 /*********USER ROUTES START HERE***** */

 {
    method:"post",
    route:"/login",
    controller:UserController,
    action:"login"
 }
   , 
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "getAllUsers"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "singleUser"
}, {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "registerUser"
}, 
{
    method: "patch",
    route: "/users/:id",
    controller: UserController,
    action: "updateUser"
},
{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "deleteUser"
}
,
 /*********USER ROUTES ENDS HERE***** */

{
    method: "post",
    route: "/books",
    controller: BooksController,
    action: "createBooks"

},
{
    method: "get",
    route: "/books",
    controller: BooksController,
    action: "getallBooks"
},
{
    method: "get",
    route: "/books/:id",
    controller: BooksController,
    action: "getOne"
}, {
    method: "delete",
    route: "/books/:id",
    controller: BooksController,
    action: "deleteBooks"
},

{
    method: "patch",
    route: "/books/:id",
    controller: BooksController,
    action: "editBooks"
},
{
    method:"post",
    route:"/authors",
    controller:AuthorController,
    action:"createAuthor"
}


/*********CATEGORY ROUTES START HERE***** */
,{
    method:"post",
    route:"/category",
    controller: CategoryController,
    action:"createCategory"
},{
    method:"get",
    route:"/category",
    controller: CategoryController,
    action:"getCategory"
}
,{
    method:"get",
    route:"/category/:id",
    controller: CategoryController,
    action:"getCategoryById"

},

,{
    method:"patch",
    route:"/category/:id",
    controller: CategoryController,
    action:"updateCategory"

},
,{
    method:"delete",
    route:"/category/:id",
    controller: CategoryController,
    action:"deleteCategory"

}



/*********CATEGORY ROUTES ENDS HERE***** */



]