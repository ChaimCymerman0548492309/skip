import React, { useState, useEffect } from "react";
import SkipCard from "./SkipCard";
import { theme } from "../styles/theme";
import type { Skip } from "../types/types";
import { fetchSkips } from "../api/api";

const SkipSelector: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkips = async () => {
      try {
        const data = await fetchSkips();

        setSkips(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    loadSkips();
  }, []);

  const handleSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  if (loading)
    return (
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: `5px solid ${theme.colors.primaryLight}`,
              borderTopColor: theme.colors.primary,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          ></div>
          <p style={{ marginTop: theme.spacing.medium }}>
            Loading skip sizes...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className="container"
        style={{
          background: theme.colors.error,
          color: "white",
          padding: theme.spacing.medium,
          borderRadius: theme.borderRadius,
        }}
      >
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="container">
      <header
        style={{
          textAlign: "center",
          marginBottom: theme.spacing.xlarge,
          padding: `${theme.spacing.xlarge} 0`,
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            color: theme.colors.primaryDark,
            marginBottom: theme.spacing.small,
          }}
        >
          Choose Your Skip Size
        </h1>
        <p
          style={{
            color: theme.colors.textSecondary,
            fontSize: "1.1rem",
          }}
        >
          Select the perfect skip for your needs from our range of sizes
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: theme.spacing.medium,
          marginBottom: theme.spacing.xlarge,
        }}
      >
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip?.id === skip.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {selectedSkip && (
        <div
          style={{
            background: theme.colors.surface,
            padding: theme.spacing.large,
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow,
            marginTop: theme.spacing.large,
          }}
        >
          <h2
            style={{
              color: theme.colors.primaryDark,
              marginBottom: theme.spacing.medium,
            }}
          >
            Your Selection Summary
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: theme.spacing.medium,
              marginBottom: theme.spacing.medium,
            }}
          >
            <div>
              <p
                style={{
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.small,
                }}
              >
                Skip Size
              </p>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}
              >
                {selectedSkip.size} yards
              </p>
            </div>

            <div>
              <p
                style={{
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.small,
                }}
              >
                Total Price
              </p>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: theme.colors.primaryDark,
                }}
              >
                £
                {(
                  selectedSkip.price_before_vat *
                  (1 + selectedSkip.vat / 100)
                ).toFixed(2)}
              </p>
            </div>

            <div>
              <p
                style={{
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.small,
                }}
              >
                Hire Period
              </p>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}
              >
                {selectedSkip.hire_period_days} days
              </p>
            </div>
          </div>

          <button
            style={{
              background: theme.colors.primary,
              color: "white",
              border: "none",
              padding: `${theme.spacing.medium} ${theme.spacing.large}`,
              borderRadius: theme.borderRadius,
              fontSize: "1rem",
              fontWeight: "bold",
              width: "100%",
              maxWidth: "300px",
              display: "block",
              margin: "0 auto",
              transition: theme.transition,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background =
                theme.colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background =
                theme.colors.primary;
            }}
          >
            Continue to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default SkipSelector;
