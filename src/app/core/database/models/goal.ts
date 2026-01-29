import { GoalTargetValueUnit } from '@core/database/models/goal-target-value-unit';

export interface Goal {
	id?: number;
	name: string;
	targetValue: number;
	unit: GoalTargetValueUnit;
	domainId: number;
}
