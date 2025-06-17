import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './modules/Error.jsx'
import MainBody from './modules/MainBody.jsx'
import Authorize from './modules/Users/Authrorize.jsx'
import Register from './modules/Users/Register.jsx'
import PrivateRoute from './modules/PrivateRoute.jsx'
import Home from './modules/Users/Home.jsx'
import Edit from './modules/Users/Edit.jsx'
import DeleteUser from './modules/Users/DeleteUser.jsx'
import CompanyMain from './modules/Company/CompanyMain.jsx'
import CompanyDelete from './modules/Company/CompanyDelete.jsx'
import CompanyEdit from './modules/Company/CompanyEdit.jsx'
import CompanyCreate from './modules/Company/CompanyCreate.jsx'
import CompanyCreateAndUser from './modules/Company/CompanyCreateAndUser.jsx'

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [{
      path: "/",
      children: [{
        path: "main",
        element: <App />,
      },
      {
        path: "login",
        children:[
          {
            path:"",
            element: <Authorize />,
          },
          {
            path: "forgetpassword",
            element: <App />
          }
        ]
      },
    {
      path: "register",
      element: <Register />
    },
  {
    element: <PrivateRoute />,
    children:[{
      path: "home",
      children: [{
        path: ":userId",
        element: <Home />,
        children: [{
          path: "edit",
          element: <Edit />
        },
      {
        path: "delete",
        element: <DeleteUser />
      }]
      },
      {
        path: "company",
        children:[{
          path: ":companyId",
          element: <CompanyMain />,
          children:[{
            path: "edit",
            element: <CompanyEdit />,
          },
          {
            path: "delete",
            element: <CompanyDelete /> 
          },
        ],
        },
        {
          path: "create",
          element: <CompanyCreate />
        }]
      }
      ]
    }]
  }]
    },
    {
      path: "company/create",
      element: <CompanyCreateAndUser />
    }]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
