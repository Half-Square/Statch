/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-20 16:13:37                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2024-01-17 18:00:49                              *
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
  }
}
/***/

interface IRule {
  type: string,
  actions: string[] | any,
}

interface IPermissions {
  projects: {
      create: boolean,
      update: {
          assignee: boolean,
          version: boolean,
          status: boolean,
          labels: boolean,
          level: boolean,
          title: boolean,
          description: boolean
      },
      view: boolean,
      delete: boolean,
      assignSelf: boolean,
      comment: {
          create: boolean,
          delete: boolean,
          update: boolean,
          updateSelf: boolean
      }
  },
  tasks: {
      create: boolean,
      update: {
          assignee: boolean,
          version: boolean,
          status: boolean,
          labels: boolean,
          level: boolean,
          title: boolean,
          description: boolean
      },
      view: boolean,
      delete: boolean,
      assignSelf: boolean,
      comment: {
          create: boolean,
          delete: boolean,
          update: boolean,
          updateSelf: boolean
      }
  },
  tickets: {
      create: boolean,
      update: {
          assignee: boolean,
          version: boolean,
          status: boolean,
          labels: boolean,
          level: boolean,
          title: boolean,
          description: boolean
      },
      view: boolean,
      delete: boolean,
      assignSelf: boolean,
      comment: {
          create: boolean,
          delete: boolean,
          update: boolean,
          updateSelf: boolean
      }
  },
  versions: {
      create: boolean
  },
  labels: {
      create: boolean,
      view: boolean,
      update: {
          name: boolean,
          description: boolean
      },
      delete: boolean
  },
  smtp: {
      update: boolean,
      view: boolean
  },
  users: {
      view: boolean,
      update: boolean
  },
  database: {
      view: boolean,
      import: boolean,
      export: boolean
  },
  permissions: {
      view: boolean,
      create: boolean,
      update: boolean,
      delete: boolean
  },
  profile: {
      update: {
          name: boolean,
          email: boolean,
          picture: boolean
      }
  },
  [key: string]: any;
}

interface IRoles {
  id: string,
  name: string,
  permissions: [IPermissions],
  users: IUsers[] | undefined
}

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
  ISysConfig,
  IRule,
  IPermissions,
  IRoles
};
