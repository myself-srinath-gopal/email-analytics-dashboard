import Icon from "./AppIcon";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-(--surface) border border-(--border) rounded-lg p-4 shadow-(--elevation-md)">
                <div className="flex items-center gap-2 mb-2">
                    <Icon name={data?.icon} size={16} className="text-(--primary)" />
                    <span className="font-medium text-(--text-primary)">{data?.stage}</span>
                </div>
                <div className="gap-1">
                    <div className="text-lg font-bold text-(--text-primary)">
                        {data?.value && data?.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-(--text-secondary)">
                        {data?.percentage}% of total sent
                    </div>
                    <div className="text-xs text-(--text-secondary)">
                        {data?.description}
                    </div>
                </div>
            </div>
        );
    }
    return null;
};


export default CustomTooltip;