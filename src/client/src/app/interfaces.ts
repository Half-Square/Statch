/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-09-20 16:13:37                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2025-05-19 16:59:32                              *
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
  * IComments
  * ISysConfig
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
  level: string,
  ownerId: string,
  status: string,
  labels: ILabels[],
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
  labels: ILabels[],
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
  labels: ILabels[],
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
  id?: string,
  userId: string,
  projectId?: string | null,
  taskId?: string | null,
  ticketId?: string | null
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

/**
* IComments
*/
interface IComments {
  id: string,
  created: string,
  content: string,
  projectId: string | null,
  taskId: string | null,
  ticketId: string | null,
  authorId: string
}
/***/

/* ISysConfig */
interface IFeatureConfig {
  allowSignup: boolean
  [key: string]: boolean
}

interface ISysConfig {
  smtp: {
    host: string,
    port: string,
    user: string
    password?: string
  },
  sys?: {
    host: string,
    api: string,
    socket: string
  },
  features: IFeatureConfig
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
  IActivities,
  IComments,
  IFeatureConfig,
  ISysConfig
};
