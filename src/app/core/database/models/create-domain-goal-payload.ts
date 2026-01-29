import { DomainGoalTargetValueUnit } from '@core/database/enums/domain-goal-target-value-unit';

export interface CreateDomainGoalPayload {
	name: string;
	targetValue: number;
	unit: DomainGoalTargetValueUnit;
	domainId: number;
}
