import { GoalTargetValueUnit } from '@core/database/models/goal-target-value-unit';

export interface CreateGoalPayload {
	name: string;
	targetValue: number;
	unit: GoalTargetValueUnit;
	domainId: number;
}
