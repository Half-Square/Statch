/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-20 16:13:37                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 09:38:44                              *
 ****************************************************************************/

/* SUMMARY
  * IProjects
  * ITasks
  * ITickets
  * IVersions
  * IAssignments
  * ILabels
  * IUsers
*/

/**
* IProjects
*/
interface IProjects {
  id: string,
  actualVersion: string | null,
  created: string,
  name: string,
  description: string,
  ownerId: string,
  status: string
}
/***/

/**
* ITasks
*/
interface ITasks {
  id: string,
  created: string,
  description: string,
  level: string,
  name: string,
  ownerId: string,
  projectId: string,
  status: string,
  targetVersionId: string | null
}
/***/

/**
* ITickets
*/
interface ITickets {
  id: string,
  created: string,
  description: string,
  level: string,
  name: string,
  ownerId: string,
  status: string,
  targetVersionId: string | null
  taskId: string
}
/***/

/**
* IVersions
*/
interface IVersions {
  id: string,
  name: string,
  projectId: string
}
/***/

/**
* IAssignments
*/
interface IAssignments {
  id: string,
  userId: string,
  projectId: string | null,
  taskId: string | null,
  ticketId: string | null
}
/***/

/**
* ILabels
*/
interface ILabels {
  id: string,
  name: string,
  description: string,
  color: string
}
/***/

/**
* IUsers
*/
interface IUsers {
  id: string,
  email: string,
  isAdmin: boolean,
  name: string,
  picture: string,
  validate: boolean
}
/***/

export {
  IProjects,
  ITasks,
  ITickets,
  IVersions,
  IAssignments,
  ILabels,
  IUsers
};
