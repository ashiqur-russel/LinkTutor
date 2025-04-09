import { Button } from "@/components/ui/button";

const ActionButtons = ({
  onCancel,
  onSave,
}: {
  onCancel?: () => void;
  onSave?: () => void;
}) => (
  <div className="flex justify-end gap-4 mt-4">
    <Button variant="secondary" onClick={onCancel}>
      Cancel
    </Button>
    <Button onClick={onSave}>Save</Button>
  </div>
);

export default ActionButtons;
