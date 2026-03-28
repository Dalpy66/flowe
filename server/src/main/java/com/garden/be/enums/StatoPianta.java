package com.garden.be.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatoPianta {
    sano("sano"),
    buono("buono"),
    allerta("allerta"),
    critico("critico");

    private final String stato;
}
