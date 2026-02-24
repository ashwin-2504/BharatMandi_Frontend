import { Feather } from "@expo/vector-icons";

const StatsCard = ({ title, value, icon }) => {
  return (
    <View style={[styles.card, SHADOWS.light]}>
      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    width: "48%",
    marginBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    marginRight: SPACING.sm,
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  title: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "600",
    marginTop: 2,
  },
});

export default StatsCard;
