import React from "react";
import { theme } from "../styles/theme";
import type { Skip } from "../types/types";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  return (
    <div
      style={{
        background: isSelected
          ? theme.colors.primaryLight
          : theme.colors.surface,
        border: isSelected
          ? `2px solid ${theme.colors.primary}`
          : `1px solid ${theme.colors.divider}`,
        borderRadius: theme.borderRadius,
        padding: theme.spacing.medium,
        cursor: "pointer",
        transition: theme.transition,
        boxShadow: theme.boxShadow,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.small,
      }}
      onClick={() => onSelect(skip)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: isSelected ? theme.colors.primaryDark : theme.colors.text,
            fontSize: "1.25rem",
          }}
        >
          {skip.size} Yard Skip
        </h3>
        {isSelected && (
          <span
            style={{
              background: theme.colors.primary,
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            ✓
          </span>
        )}
      </div>

      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          margin: `${theme.spacing.small} 0`,
          color: theme.colors.primaryDark,
        }}
      >
        £{totalPrice.toFixed(2)}
      </p>

      <p style={{ color: theme.colors.textSecondary }}>
        {skip.hire_period_days} days hire
      </p>

      <div
        style={{ display: "flex", gap: theme.spacing.small, flexWrap: "wrap" }}
      >
        {skip.allowed_on_road && (
          <span
            style={{
              background: theme.colors.secondary,
              color: theme.colors.text,
              padding: `${theme.spacing.small} ${theme.spacing.medium}`,
              borderRadius: theme.borderRadius,
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            Road Permit Included
          </span>
        )}
        {skip.allows_heavy_waste && (
          <span
            style={{
              background: theme.colors.secondary,
              color: theme.colors.text,
              padding: `${theme.spacing.small} ${theme.spacing.medium}`,
              borderRadius: theme.borderRadius,
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            Heavy Waste Allowed
          </span>
        )}
      </div>
    </div>
  );
};

export default SkipCard;
