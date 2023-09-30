/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-20 16:13:37                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-30 16:39:53                              *
 ****************************************************************************/

/* SUMMARY
  * IProjects
  * ITasks
  * ITickets
  * IVersions
  * IAssignments
  * ILabels
  * IUsers
  * IActivities
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
  status: string,
  assignments: IAssignments[]
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
  targetVersionId: string | null,
  assignments: IAssignments[]
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
  taskId: string,
  assignments: IAssignments[]
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

/**
* IActivities
*/
interface IActivities {
  id: string,
  created: string,
  actor: {
      type: string,
      id: string
  },
  action: {
      type: string,
      prev: string | null,
      curr: string | null,
      field: string | undefined
  },
  target: {
      type: string,
      id: string
  }
}
/***/

export {
  IProjects,
  ITasks,
  ITickets,
  IVersions,
  IAssignments,
  ILabels,
  IUsers,
  IActivities
};
