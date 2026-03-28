package com.garden.be.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatoPianta {
    SANO("sano"),
    BUONO("buono"),
    ALLERTA("allerta"),
    CRITICO("critico");

    private final String stato;
}
