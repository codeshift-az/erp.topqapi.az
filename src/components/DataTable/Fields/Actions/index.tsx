// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Helpers
import { hasPermission } from "@/helpers";

// Components
import ActionButton from "../ActionButton";

interface Props<T> {
  data: T;
  children?: React.ReactNode;
  onView?: string | ((data: T) => string);
  onUpdate?: (data: T) => void;
  onDelete?: (data: T) => void;
}

const Actions = <T,>({
  data,
  onView,
  onUpdate,
  onDelete,
  children,
}: Props<T>) => {
  const { user } = useSelector((state: RootState) => state.account);

  return (
    <div className="d-flex gap-3">
      {onView && (
        <ActionButton
          name="view"
          icon="mdi-eye"
          color="primary"
          tooltip="Ətraflı bax"
          url={typeof onView == "string" ? onView : undefined}
          onClick={() => typeof onView != "string" && onView(data)}
        />
      )}

      {onUpdate && (
        <ActionButton
          name="edit"
          tooltip="Redaktə et"
          color="success"
          icon="mdi-pencil"
          onClick={() => onUpdate(data)}
        />
      )}

      {onDelete && (
        <ActionButton
          name="delete"
          tooltip="Sil"
          color="danger"
          icon="mdi-delete"
          hasPermission={hasPermission(user, [], true)}
          onClick={() => onDelete(data)}
        />
      )}

      {children}
    </div>
  );
};

export default Actions;
