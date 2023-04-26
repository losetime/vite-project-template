export interface EvaluationNodeRelationInterface {
  nodeId: string
  prevNodeId: string
  projectType: string
}

export interface BidBindInterface {
  bidNo?: string
  projectType: string
}

export interface AddQualityEvaluationUnitProjectInterface {
  buildingNameList: Array<string>
  projectType: string
  unitProjectTemplateIdList: Array<string>
}

export interface AddQualityEvaluationNodesInterface {
  addTemplateNodeIdList: Array<string>
  unitProjectNodeId: string
}

export interface AddScheduleItemInterface {
  endDate: string
  id?: string
  projectName: string
  projectType: string
  startDate: string
}
